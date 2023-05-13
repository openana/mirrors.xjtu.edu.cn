'use client';

type PostIntroProps = {
  title: string;
  date: string;
  tags: string[];
};

export function PostIntro({ title, date, tags }: PostIntroProps) {
  return (
    <section className="flex flex-col space-y-4 sm:p-3">
      <h1 className="">{title}</h1>
      <div className="">
        <span>Published </span>
        <time dateTime={date}>date</time>
      </div>
    </section>
  );
}
