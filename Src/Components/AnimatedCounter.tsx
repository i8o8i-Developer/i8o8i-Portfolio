import { useCountUp } from "@/Hooks/UseCountUp";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) => {
  const { ref, value } = useCountUp({ end, duration, startOnView: true, decimals, prefix, suffix });

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className={className}>
      {value}
    </span>
  );
};

export default AnimatedCounter;