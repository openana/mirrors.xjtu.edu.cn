import * as React from 'react';
import { PageProps } from 'gatsby';

import { FilesTable } from '../../components/mirrors/table';

const MirrorsPage: React.FC<PageProps> = ({ location }, props) => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <FilesTable location={location} {...props} />
        </div>
        <div className="col-span-3">B</div>
      </div>
    </div>
  );
};

export default MirrorsPage;
