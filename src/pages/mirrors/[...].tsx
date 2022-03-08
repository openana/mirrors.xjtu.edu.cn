import * as React from 'react';
import { PageProps } from 'gatsby';

import { FilesTable, MirrorsTable } from '../../components/mirrors/table';
import { IMirrors, IMirrorsYaml } from '../../components/mirrors/table/types';

const mirrorsYaml: IMirrorsYaml = require('../../../content/mirrors.yaml');

const MirrorsPage: React.FC<PageProps> = ({ location }, props) => {
  const [mirrors, setMirrors] = React.useState<IMirrors>({
    data: mirrorsYaml.data,
    error: null,
  });

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      {location.pathname === '/mirrors/' ? (
        <MirrorsTable mirrors={mirrors} setMirrors={setMirrors} />
      ) : (
        <FilesTable location={location} {...props} />
      )}
    </div>
  );
};

export default MirrorsPage;
