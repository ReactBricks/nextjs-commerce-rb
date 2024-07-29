import { RichText, Text, types } from 'react-bricks/rsc';

interface TitleProps {
  title: types.TextValue;
}

const Title: types.Brick<TitleProps> = ({ title }) => {
  return (
    <div className="mx-8 max-w-2xl py-10 sm:mx-auto" lang="en">
      <Text
        propName="title"
        value={title}
        renderBlock={({ children }) => (
          <h1 className="m-0 text-5xl font-bold dark:text-white">{children}</h1>
        )}
        placeholder="Type a title..."
      />
    </div>
  );
};

Title.schema = {
  name: 'title',
  label: 'Title',
  getDefaultProps: () => ({
    title: 'Page title'
  })
};

export default Title;
