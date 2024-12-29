export type MirrorConfig = {
  alias: string[];
  title: string;
  desc?: string;
  path?: string;
  files?: {
    path: string;
    name: string;
    linkTo?: string;
  }[];
  display_only?: boolean;
  status?: any;
};

export const mirrorConfigs: MirrorConfig[] = [
  {
    alias: ['alpine'],
    title: 'Alpine Linux',
    desc: 'Alpine Linux is a Linux distribution based on musl and BusyBox, designed for security, simplicity, and resource efficiency. It uses OpenRC for its init system and compiles all user-space binaries as position-independent executables with stack-smashing protection.',
  },
  {
    alias: ['anaconda'],
    title: 'Anaconda',
    desc: 'Anaconda is a distribution of the Python and R programming languages for scientific computing, that aims to simplify package management and deployment. The distribution includes data-science packages suitable for Windows, Linux, and macOS.',
  },
  {
    alias: ['archlinux'],
    title: 'Arch Linux',
    desc: 'Arch Linux is an independently developed, x86-64 general-purpose Linux distribution that strives to provide the latest stable versions of most software by following a rolling-release model. The default installation is a minimal base system, configured by the user to only add what is purposely required.',
  },
  {
    alias: ['archlinuxcn'],
    title: 'Arch Linux 中文社区',
    desc: 'Arch Linux 中文社区软件仓库是由 Arch Linux 中文社区驱动的非官方软件仓库，包含许多官方仓库未提供的额外的软件包，以及已有软件的 git 版本等变种。一部分软件包的打包脚本来源于 AUR，但也有许多包与 AUR 不一样。',
  },
  {
    alias: ['centos'],
    title: 'CentOS',
    desc: 'CentOS (from Community Enterprise Operating System; also known as CentOS Linux) was a Linux distribution that provided a free and open-source community-supported computing platform, functionally compatible with its upstream source, Red Hat Enterprise Linux (RHEL). In January 2014, CentOS announced the official joining with Red Hat while staying independent from RHEL, under a new CentOS governing board.',
  },
  {
    alias: ['centos-vault'],
    title: 'CentOS Vault',
    desc: 'CentOS (from Community Enterprise Operating System; also known as CentOS Linux) was a Linux distribution that provided a free and open-source community-supported computing platform, functionally compatible with its upstream source, Red Hat Enterprise Linux (RHEL). In January 2014, CentOS announced the official joining with Red Hat while staying independent from RHEL, under a new CentOS governing board.',
    display_only: true,
    status: {
      name: 'centos-vault',
      status: 'mirrorz',
      last_update_ts: -1,
    },
  },
  {
    alias: ['ceph'],
    title: 'Ceph',
    desc: 'Ceph is an open-source software-defined storage platform that provides object storage, block storage, and file storage built on a common distributed cluster foundation. Ceph provides completely distributed operation without a single point of failure and scalability to the exabyte level, and is freely available. Since version 12 (Luminous), Ceph does not rely on any other, conventional filesystem and directly manages HDDs and SSDs with its own storage backend BlueStore and can expose a POSIX filesystem.',
  },
  {
    alias: ['cpan'],
    title: 'CPAN',
    desc: 'The Comprehensive Perl Archive Network (CPAN) is a repository of over 250,000 software modules and accompanying documentation for 39,000 distributions, written in the Perl programming language by over 12,000 contributors. CPAN can denote either the archive network or the Perl program that acts as an interface to the network and as an automated software installer (somewhat like a package manager). Most software on CPAN is free and open source software.',
  },
  {
    alias: ['cran'],
    title: 'CRAN',
    desc: "The Comprehensive R Archive Network (CRAN) is R's central software repository, supported by the R Foundation. It contains an archive of the latest and previous versions of the R distribution, documentation, and contributed R packages. It includes both source packages and pre-compiled binaries for Windows and macOS. As of November 2020, more than 16,000 packages are available.",
  },
  {
    alias: ['ctan'],
    title: 'CTAN',
    desc: 'CTAN (an acronym for "Comprehensive TeX Archive Network") is the authoritative place where TeX related material and software can be found for download. Repositories for other projects, such as the MiKTeX distribution of TeX, constantly mirror most of CTAN.',
  },
  {
    alias: ['cygwin'],
    title: 'Cygwin',
    desc: 'Cygwin is a Unix-like environment and command-line interface for Microsoft Windows. Cygwin\'s purpose is expressed in its motto: "Get that Linux feeling – on Windows".',
  },
  {
    alias: ['debian'],
    title: 'Debian',
    desc: 'Debian also known as Debian GNU/Linux, is a Linux distribution composed of free and open-source software, developed by the community-supported Debian Project, which was established by Ian Murdock on August 16, 1993.',
  },
  {
    alias: ['debian-cd'],
    title: 'Debian CD',
    desc: 'Debian also known as Debian GNU/Linux, is a Linux distribution composed of free and open-source software, developed by the community-supported Debian Project, which was established by Ian Murdock on August 16, 1993.',
  },
  {
    alias: ['debian-security'],
    title: 'Debian Security',
    desc: 'Debian also known as Debian GNU/Linux, is a Linux distribution composed of free and open-source software, developed by the community-supported Debian Project, which was established by Ian Murdock on August 16, 1993.',
  },
  {
    alias: ['deepin'],
    title: 'Deepin',
    desc: 'Deepin (stylized as deepin; formerly known as Linux Deepin and Hiweed Linux) is a Linux distribution based on the Debian "stable" branch. It features the Deepin Desktop Environment (DDE), built on Qt and available for a variety of distributions. The userbase is predominantly Chinese, though it is in most prominent Linux distributions\' repositories as an alternative desktop environment. The company behind the development, Deepin Technology, a wholly owned subsidiary of UnionTech (统信软件), is based in Wuhan, China.',
  },
  {
    alias: ['docker-ce'],
    title: 'Docker CE',
    desc: 'Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels.',
  },
  {
    alias: ['epel'],
    title: 'EPEL',
    desc: 'EPEL is a repository of extra packages published by the Fedora project, which can be expected to work in RHEL and RHEL-compatible systems. EPEL is organised by a Fedora Special Interest Group. EPEL packages are usually based on their Fedora counterparts and will never conflict with or replace packages in the base Enterprise Linux distributions. EPEL uses much of the same infrastructure as Fedora, including buildsystem, bugzilla instance, updates manager, mirror manager and more.',
  },
  {
    alias: ['fedora'],
    title: 'Fedora Linux',
    desc: 'Fedora Linux is a Linux distribution developed by the Fedora Project. It was originally developed as a continuation of the Red Hat Linux project and it contains software distributed under various free and open-source licenses and aims to be on the leading edge of open-source technologies. It is now the upstream source for Red Hat Enterprise Linux.',
  },
  {
    alias: ['gnu'],
    title: 'GNU',
    desc: "GNU is an extensive collection of free software (383 packages as of January 2022), which can be used as an operating system or can be used in parts with other operating systems. The use of the completed GNU tools led to the family of operating systems popularly known as Linux. Most of GNU is licensed under the GNU Project's own General Public License (GPL).",
  },
  {
    alias: ['homebrew-bottles'],
    title: 'Homebrew Bottles',
    desc: "Homebrew is a free and open-source software package management system that simplifies the installation of software on Apple's operating system, macOS, as well as Linux. The name is intended to suggest the idea of building software on the Mac depending on the user's taste.",
    files: [{ path: '*', name: 'bottles', linkTo: '/' }],
  },
  {
    alias: ['iina'],
    title: 'IINA',
    desc: 'IINA is a free and open-source media player software based on mpv and written in Swift for macOS. It is released under the GNU General Public License version 3 (GPLv3).',
  },
  {
    alias: ['jenkins'],
    title: 'Jenkins',
    desc: 'Jenkins is an open source automation server. It helps automate the parts of software development related to building, testing, and deploying, facilitating continuous integration and continuous delivery. It is a server-based system that runs in servlet containers such as Apache Tomcat.',
  },
  {
    alias: ['kali'],
    title: 'Kali Linux',
    desc: 'Kali Linux is a Debian-derived Linux distribution designed for digital forensics and penetration testing. It is maintained and funded by Offensive Security.',
  },
  {
    alias: ['kali-images'],
    title: 'Kali Images',
    desc: 'Kali Linux is a Debian-derived Linux distribution designed for digital forensics and penetration testing. It is maintained and funded by Offensive Security.',
  },
  {
    alias: ['kernel'],
    title: 'Kernel',
    desc: 'Kernel',
  },
  {
    alias: ['manjaro'],
    title: 'Manjaro',
    desc: 'Manjaro is a free and open-source Linux distribution based on the Arch Linux operating system that has a focus on user-friendliness and accessibility. It uses a rolling release update model and Pacman as its package manager.',
  },
  {
    alias: ['manjaro-cd'],
    title: 'Manjaro CD',
    desc: 'Manjaro is a free and open-source Linux distribution based on the Arch Linux operating system that has a focus on user-friendliness and accessibility. It uses a rolling release update model and Pacman as its package manager.',
  },
  {
    alias: ['mongodb'],
    title: 'MongoDB',
    desc: 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL) which is deemed non-free by several distributions. MongoDB is a member of the MACH Alliance.',
  },
  {
    alias: ['openeuler'],
    title: 'OpenEuler',
    desc: 'EulerOS is a commercial Linux distribution developed by Huawei based on Red Hat Enterprise Linux to provide an operating system for server and cloud environments.',
  },
  {
    alias: ['openwrt'],
    title: 'OpenWrt',
    desc: 'OpenWrt (from open wireless router) is an open-source project for embedded operating systems based on Linux, primarily used on embedded devices to route network traffic. The main components are Linux, util-linux, musl, and BusyBox. All components have been optimized to be small enough to fit into the limited storage and memory available in home routers.',
  },
  {
    alias: ['pypi'],
    title: 'PyPI',
    desc: 'The Python Package Index, abbreviated as PyPI and also known as the Cheese Shop (a reference to the Monty Python\'s Flying Circus sketch "Cheese Shop"), is the official third-party software repository for Python. It is analogous to the CPAN repository for Perl and to the CRAN repository for R. PyPI is run by the Python Software Foundation, a charity. Some package managers, including pip, use PyPI as the default source for packages and their dependencies.',
    display_only: true,
    status: {
      name: 'pypi',
      status: 'proxy',
      last_ended_ts: -1,
      last_update_ts: -1,
      last_schedule_ts: -1,
      upstream:
        'https://pypi.tuna.tsinghua.edu.cn/, https://mirrors.cloud.tencent.com/pypi/, https://pypi.org/',
      size: 'N/A',
    },
  },
  {
    alias: ['raspberrypi'],
    title: 'Raspberry Pi',
    desc: 'Raspberry Pi is a series of small single-board computers (SBCs) developed in the United Kingdom by the Raspberry Pi Foundation in association with Broadcom. The Raspberry Pi project originally leaned towards the promotion of teaching basic computer science in schools. The original model became more popular than anticipated, selling outside its target market for uses such as robotics. It is widely used in many areas, such as for weather monitoring, because of its low cost, modularity, and open design.',
  },
  {
    alias: ['raspberrypi-images'],
    title: 'Raspberry Pi Images',
    desc: 'Raspberry Pi is a series of small single-board computers (SBCs) developed in the United Kingdom by the Raspberry Pi Foundation in association with Broadcom. The Raspberry Pi project originally leaned towards the promotion of teaching basic computer science in schools. The original model became more popular than anticipated, selling outside its target market for uses such as robotics. It is widely used in many areas, such as for weather monitoring, because of its low cost, modularity, and open design.',
  },
  {
    alias: ['raspbian'],
    title: 'Raspbian',
    desc: 'Raspberry Pi OS (formerly Raspbian) is a Unix-like operating system based on the Debian Linux distribution for the Raspberry Pi family of compact single-board computers. First developed independently in 2012, it has been produced as the primary operating system for these boards since 2013, distributed by the Raspberry Pi Foundation.',
  },
  {
    alias: ['rfc'],
    title: 'RFC',
    desc: 'A Request for Comments (RFC) is a publication in a series from the principal technical development and standards-setting bodies for the Internet, most prominently the Internet Engineering Task Force (IETF). An RFC is authored by individuals or groups of engineers and computer scientists in the form of a memorandum describing methods, behaviors, research, or innovations applicable to the working of the Internet and Internet-connected systems. It is submitted either for peer review or to convey new concepts, information, or, occasionally, engineering humor.',
  },
  {
    alias: ['rocky'],
    title: 'Rocky Linux',
    desc: 'Rocky Linux is a Linux distribution developed by Rocky Enterprise Software Foundation, which is a privately owned benefit corporation that describes itself as a "self-imposed not-for-profit". It is intended to be a downstream, complete binary-compatible release using the Red Hat Enterprise Linux (RHEL) operating system source code.',
  },
  {
    alias: ['ros'],
    title: 'ROS',
    desc: 'ROS (Robot Operating System) provides libraries and tools to help software developers create robot applications. It provides hardware abstraction, device drivers, libraries, visualizers, message-passing, package management, and more. ROS is licensed under an open source, BSD license.',
  },
  {
    alias: ['ros2'],
    title: 'ROS 2',
    desc: 'The Robot Operating System (ROS) is a set of software libraries and tools for building robot applications. From drivers and state-of-the-art algorithms to powerful developer tools, ROS has the open source tools you need for your next robotics project.',
  },
  {
    alias: ['ros2-rhel'],
    title: 'ROS 2 (RHEL)',
    desc: 'The Robot Operating System (ROS) is a set of software libraries and tools for building robot applications. From drivers and state-of-the-art algorithms to powerful developer tools, ROS has the open source tools you need for your next robotics project.',
  },
  {
    alias: ['rpmfusion'],
    title: 'RPM Fusion',
    desc: "RPM Fusion is a software repository, providing add-on packages for Fedora Linux. It was born as a merge of the older repositories Livna, Dribble and Freshrpms. They distributed software that Fedora will not, either because it does not meet Fedora's definition of free software, or because distribution of that software may violate US law.",
  },
  {
    alias: ['ubuntu'],
    title: 'Ubuntu',
    desc: 'Ubuntu is a Linux distribution based on Debian and composed mostly of free and open-source software. Ubuntu is officially released in three editions: Desktop, Server, and Core for Internet of things devices and robots.',
    files: [{ path: '*', name: 'ubuntu', linkTo: '/' }],
  },
  {
    alias: ['ubuntu-ports'],
    title: 'Ubuntu Ports',
    desc: 'Ubuntu is a Linux distribution based on Debian and composed mostly of free and open-source software. Ubuntu is officially released in three editions: Desktop, Server, and Core for Internet of things devices and robots.',
    files: [{ path: '*', name: 'ubuntu-ports', linkTo: '/' }],
  },
  {
    alias: ['ubuntu-releases'],
    title: 'Ubuntu Releases',
    desc: 'Ubuntu is a Linux distribution based on Debian and composed mostly of free and open-source software. Ubuntu is officially released in three editions: Desktop, Server, and Core for Internet of things devices and robots.',
    files: [{ path: '*', name: 'releases', linkTo: '/' }],
  },
  {
    alias: ['vim'],
    title: 'Vim',
    desc: "Vim (a contraction of Vi IMproved) is a free and open-source, screen-based text editor program. It is an improved clone of Bill Joy's vi. Vim's author, Bram Moolenaar, derived Vim from a port of the Stevie editor for Amiga and released a version to the public in 1991. Vim is designed for use both from a command-line interface and as a standalone application in a graphical user interface.",
  },
  {
    alias: ['zabbix'],
    title: 'Zabbix',
    desc: 'Zabbix is an open-source software tool to monitor IT infrastructure such as networks, servers, virtual machines, and cloud services. Zabbix collects and displays basic metrics.',
  },
];
