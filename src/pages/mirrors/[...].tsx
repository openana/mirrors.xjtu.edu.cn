import * as React from 'react';
import { graphql, useStaticQuery, PageProps } from 'gatsby';

import { Aside } from '../../components/mirrors/aside';
import { Search } from '../../components/mirrors/search';
import { FilesTable, MirrorsTable } from '../../components/mirrors/table';
import { IMirrors } from '../../components/mirrors/table/types';

const MirrorsPage: React.FC<PageProps> = ({ location }, props) => {
  const data = useStaticQuery(graphql`
    query mirrorsYamlQuery {
      contentYaml(yamlId: { base: { eq: "mirrors.yaml" } }) {
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
      <div className="grid grid-cols-4 gap-4 py-10">
        <div className="col-span-3">
          <div className="mb-4">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2">
                <Search />
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="mb-4">
            {location.pathname.replace(/^(\/mirrors\.xjtu\.edu\.cn)/, '') ===
            '/mirrors/' ? (
              <MirrorsTable mirrors={mirrors} setMirrors={setMirrors} />
            ) : (
              <FilesTable location={location} {...props} />
            )}
          </div>
        </div>
        <div className="col-span-1">
          <Aside />
        </div>
      </div>
    </div>
  );
};

export default MirrorsPage;
