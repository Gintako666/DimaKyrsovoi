import { FC, ReactNode } from 'react';
import handleClassName from '~/utils/className.util';

interface SectionFormProps {
  className: string;
  modifier?: string;
  children: ReactNode;
}

const SectionForm: FC<SectionFormProps> = ({
  className,
  modifier,
  children,
}) => {
  const modifiedClassName = handleClassName(
    !!modifier,
    `${ className }__section-form`,
    modifier,
  );

  return (
    <section className={ `${ modifiedClassName } section-form` }>
      <div className="section-form__container">{children}</div>
    </section>
  );
};

SectionForm.defaultProps = {
  modifier: undefined,
};

export default SectionForm;
