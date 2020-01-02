import { match as routerMatch } from 'react-router';
import { createMemoryHistory, createLocation } from 'history';

type MatchParameter<Params> = { [k in keyof Params]?: string };

export const getRouterTestProps = <Params extends MatchParameter<Params> = {}>(
    path: string,
    params: Params,
    extendMatch: Partial<routerMatch<any>> = {}
) => {
    const match: routerMatch<Params> = Object.assign(
        {},
        {
            isExact: false,
            path,
            url: generateUrl(path, params),
            params
        },
        extendMatch
    );
    const history = createMemoryHistory();
    const location = createLocation(match.url);

    return { location, history, match };
};

const generateUrl = <Params extends MatchParameter<Params>>(
    path: string,
    params: Params
): string => {
    let tempPath = path;

    for (const param in params) {
        if (params.hasOwnProperty(param)) {
            const value = params[param];
            tempPath = tempPath.replace(
                `:${value}`,
                value as NonNullable<typeof value>
            );
        }
    }

    return tempPath;
};
