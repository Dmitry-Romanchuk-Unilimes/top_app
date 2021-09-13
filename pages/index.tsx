import { useState } from 'react';
import { Htag, P, Tag, Button, Rating } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag='h1'>Header</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
      <P size='l'>Large</P>
      <P size='m'>Medium</P>
      <P size='s'>Small</P>
      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>Red</Tag>
      <Tag size='m' color='green'>Green</Tag>
      <Tag color='primary'>Primary</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
    </>
  );
}

export default withLayout(Home);