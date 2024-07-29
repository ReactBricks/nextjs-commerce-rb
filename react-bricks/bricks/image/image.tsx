import { types, Image } from 'react-bricks/rsc';

interface ImageBrickProps {
  image: types.IImageSource;
}
const ImageBrick: types.Brick<ImageBrickProps> = ({ image }) => {
  return (
    <div className="mx-8 max-w-2xl py-10 sm:mx-auto">
      <Image
        propName="image"
        source={image}
        alt="Image"
        imageClassName="mx-auto"
        // aspectRatio={1.7}
      />
    </div>
  );
};

ImageBrick.schema = {
  name: 'image',
  label: 'Image',
  getDefaultProps: () => ({})
};

export default ImageBrick;
