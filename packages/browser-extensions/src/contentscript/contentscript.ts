import { parseMainContent } from '@reservoir-dogs/html-parser';
import { colorizeWords } from '../modules/markHTML/markHTML';
import { messenger } from '@reservoir-dogs/browser-transport';
import {
    extractRequest,
    ParsePageType,
    NEREntitiesTypesList,
    NEREntity,
    NERConfig,
    CommonTextResponse,
} from '@reservoir-dogs/model';

messenger.subscribe(ParsePageType.PARSE_PAGE_REQUEST, async () => {
    const { text, htmlElements } = parseMainContent(document, location.href);

    if (text.length === 0) {
        return;
    }

    // return { summary: '"QUICK GUIDE: ANGULAR VS. REACT\\nJavier RamosFollowJan 3  3 min readAs Baas and server-less grow in popularity, front end development becomes the key customer enabler for organizations. With React you need to choose your libraries and learn them and with Angular they are included in the framework.\\n\\nBoth try to solve the same problem which is maintaining the state machine on complex interactive sites using SPAs. You have several options.\\n * Easy to have a single code base for mobile, web and PWA, specially with Ionic.\\n * Lots of plugins and integrations.\\n * Great for small and medium complex apps.\\n * Easy to learn.\\n * Full Framework: Components, Dependency Injection, Forms, Routing\\n * Easier to divide teams and roles (designer/developer). React can easily manage complex dynamic iterations using Redux.\\n * More complex and harder to learn.\\n * More real world apps on the market and higher usage.\\n * Harder to have a single code base.\\n * In general more expensive to deliver a project in React compared to Angular.\\n * Better integration with GraphQL.\\n\\nUSE CASES\\nANGULAR\\n * Your Dev team have Java knowledge but limited JavaScript skills.\\n * Your app is small or medium in complexity and has simple state machine.\\n * You want the same app for web and mobile.\\n * You already have a hybrid app using Ionic or NativeScript.\\n * Your priority is web, then Android, then iOS.\\n * You have limited budget.\\n * You dont need to use many external JavaScript libs.\\n\\nREACT\\n * You have a complex web site that needs to load fast and perform well.\\n * You have a lot of dependencies, lots of components, very dynamic web site with a complex state.\\n * Your team have good knowledge of JavaScript and ES6.\\n * You want high performance and two separate code bases for mobile and web but a hybrid approach on mobile with great performance.\\n * You need access to many JavaScript libraries and the latest technologies like GraphQL.\\n * You want a future proof solution with great support.\\n\\n\\n\\n\\nThis is just the tip of the iceberg, SPAs are great for building great front end apps and integrate well with APIs and Serverless applications like AWS Lambda, but they have also disadvantages like poor SEO performance which can be a huge problem for e-commerce and marketing. I will write a simple guide explaining the different considerations, so you can make an informative decision for your organization. ' };

    const response = await messenger.send<CommonTextResponse>(extractRequest(text));

    if (!response) {
        return;
    }

    const NERList = Object.entries(response.ner) as [NEREntitiesTypesList, NEREntity[] | undefined][];

    NERList.forEach(([NEREntityName, NEREntities]) => {
        const color = NERConfig[NEREntityName] ? NERConfig[NEREntityName].color : '';

        if (NEREntities && color) {
            const words = NEREntities.map((entity) => entity.word);

            colorizeWords(htmlElements, words, color);
        }
    });

    return response;
});
