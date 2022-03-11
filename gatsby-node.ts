import { GatsbyNode } from 'gatsby';
import { resolve } from 'path';

export interface IAllMdx {
  errors?: any;
  data?: {
    allMdx: {
      edges: {
        node: {
          slug: string;
        };
      }[];
    };
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const docsTemplate = resolve(__dirname, '../../src/templates/docs.tsx');
  const newsTemplate = resolve(__dirname, '../../src/templates/news.tsx');

  const allMdx: IAllMdx = await graphql(`
    query {
      allMdx {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (allMdx.errors) {
    console.error(allMdx.errors);
    throw Error(allMdx.errors);
  }

  allMdx.data.allMdx.edges.forEach((edge) => {
    const { slug } = edge.node;

    let template = undefined;
    if (slug.startsWith('docs/')) {
      template = docsTemplate;
    } else if (slug.startsWith('news/')) {
      template = newsTemplate;
    }

    if (template) {
      const createTemplatePage = (path) =>
        createPage({
          path: path,
          component: template,
          context: {
            slug,
          },
        });

      createTemplatePage(slug);
    }
  });
};
