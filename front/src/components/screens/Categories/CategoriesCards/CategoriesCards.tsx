import { FC } from 'react';

import Title from '~/components/shared/Title/Title';

const CategoriesCards: FC = () => (
  <section className="categories-cards">
    <div className="categories-cards__container">
      <Title
        className="categories"
        modifier="large"
        title="Categories"
        text="Categories lorem ipsum dolor sit amet dolor sit transaction description dummy text and so оп and so оn..."
      />
    </div>
  </section>
);

export default CategoriesCards;
