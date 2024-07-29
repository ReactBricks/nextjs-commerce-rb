import { types } from 'react-bricks/rsc';
import Paragraph from './paragraph/paragraph';
import Footer from './layout/footer/footer';
import FooterMenuItem from './layout/footer/footer-menu-item';
import Accordion from './accordion/accordion';
import BigImageCaption from './big-image-caption/big-image-caption';
import TextTextImage from './text-text-image/text-text-image';
import ProductDetail from './product/product-detail/product-detail';
import RelatedProducts from './product/related-products/related-products';
import Carousel from './carousel/carousel';
import CarouselItem from './carousel/carousel-item';
import ImageBrick from './image/image';
import LastUpdated from './last-updated/last-updated';
import HomeCarousel from './home/home-carousel/home-carousel';
import HomeThreeItems from './home/home-three-items/home-three-items';
import Review from './review/review';
import Faq from './faq/faq';
import FaqItem from './faq/faq-item';
import Title from './title/title';

const bricks: types.Theme[] = [
  {
    themeName: 'Next Commerce RB',
    categories: [
      {
        categoryName: 'Content',
        bricks: [Title, Paragraph, BigImageCaption, ImageBrick, LastUpdated, Faq, FaqItem]
      },
      {
        categoryName: 'Home',
        bricks: [HomeCarousel, HomeThreeItems]
      },
      {
        categoryName: 'Layout',
        bricks: [Footer, FooterMenuItem]
      },
      {
        categoryName: 'Product',
        bricks: [
          ProductDetail,
          RelatedProducts,
          Carousel,
          CarouselItem,
          Accordion,
          TextTextImage,
          Review
        ]
      }
    ]
  }
];

export default bricks;
