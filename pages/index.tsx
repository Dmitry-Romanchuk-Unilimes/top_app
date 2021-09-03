import { Htag } from '../components';
import { Button } from '../components';

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' onClick={() => alert(3)}>Кнопка</Button>
      <Button appearance='ghost'>Кнопка</Button>
    </>
  );
}
