import clsx from 'clsx';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type Props = {
  rate?: number;
  className?: string;
};

const Rating = ({ rate = 0, className, ...props }: Props) => {
  return (
    <div
      className={clsx('flex flex-row justify-center gap-2 md:justify-start', {
        [className || '']: !!className,
      })}
      {...props}
    >
      {[1, 2, 3, 4, 5].map((x) => (
        <span key={x}>
          {x <= rate ? (
            <AiFillStar className="mask mask--star h-6 w-6 text-black" />
          ) : (
            <AiOutlineStar className="mask mask--star h-6 w-6 text-black" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
