import * as React from 'react';
import { graphql, useStaticQuery, PageProps } from 'gatsby';

import 'katex/dist/katex.min.css';

import { MirrorsTable } from '../../components/mirrors/table';
import { IMirrors } from '../../components/mirrors/table/types';

const MirrorsPage: React.FC<PageProps> = ({}) => {
  const data = useStaticQuery(graphql`
    query mirrorsYamlQuery {
      contentYaml(yamlId: { eq: "content/mirrors.yaml" }) {
        data {
          alts
          desc
          id
          docs
          name
          status
          tags
          type
        }
      }
    }
  `);

  const [mirrors, setMirrors] = React.useState<IMirrors>({
    data: data.contentYaml.data,
    error: null,
  });

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <MirrorsTable mirrors={mirrors} setMirrors={setMirrors} />
        </div>
        <div className="col-span-3">B</div>
      </div>
    </div>
  );
};

export default MirrorsPage;
