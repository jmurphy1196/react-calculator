interface CalculatorBtnProps {
  type: string;
  onClick?: () => void;
  value: string;
  order: number;
}

const CalculatorBtn: React.FC<CalculatorBtnProps> = ({
  type,
  onClick,
  value,
  order,
}) => {
  return (
    <div
      onClick={onClick}
      className={`div${order} calculator__btn calculator__btn--${type}`}
    >
      {value}
    </div>
  );
};
export default CalculatorBtn;
