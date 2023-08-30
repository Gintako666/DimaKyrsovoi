import { FC, useContext, useMemo } from 'react';

import Title from '~/components/shared/Title/Title';
import { CategoriesContext } from '~/contexts/category.context';
import Popup from '~/components/base/Popup/Popup';
import Breadcrumbs from '~/components/shared/Breadcrumbs/Breadcrumbs';
import CategoryCards from './CategoryCards/CategoryCards';
import Form from './AddCategory/Form';

const Categories: FC = () => {
  const {
    currentCategory, openPopup, setOpenPopup, curentCategoryParentsList,
  } = useContext(CategoriesContext);

  const breadcrumbs = useMemo(() => [ { name: 'Categories', url: '/categories' }, ...curentCategoryParentsList.map((item) => ({
    name: item.name, url: `/categories/${ item.id }`,
  })) ], [ curentCategoryParentsList ]);

  return (
    <section className="categories">
      <div className="categories__container">
        {!!currentCategory && <Breadcrumbs breadcrumbs={ breadcrumbs } />}

        <div className="categories__header">
          <Title
            className="categories"
            modifier="large"
            title={ currentCategory?.name || 'Categories' }
            text="Categories lorem ipsum dolor sit amet dolor sit transaction description dummy text and so оn and so оn..."
          />
          <Popup
            className="category-cards"
            modifier="edit"
            button="Add new category"
            buttonClassName="categories__button button button_transparent"
            isActive={ openPopup }
            setIsActive={ setOpenPopup }
          >
            <Title
              className="add-category"
              title="Add new category"
              text="This information will help you out lorem ipsum"
            />
            <Form />
          </Popup>
        </div>
        <CategoryCards />
      </div>
    </section>
  );
};

export default Categories;
