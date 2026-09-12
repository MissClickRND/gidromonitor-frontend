import { useReducedMotion } from "@mantine/hooks";
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageTransitionProvider.module.css";

type TransitionPhase = "idle" | "covering" | "revealing";

type PageTransitionContextValue = {
  isTransitioning: boolean;
  navigateWithTransition: (to: string) => void;
};

type PageTransitionProviderProps = {
  children: ReactNode;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);
export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const destinationRef = useRef<string | null>(null);
  const [phase, setPhase] = useState<TransitionPhase>("idle");

  const navigateWithTransition = useCallback(
    (to: string) => {
      if (phase !== "idle") {
        return;
      }

      if (reduceMotion) {
        navigate(to);
        return;
      }

      destinationRef.current = to;
      setPhase("covering");
    },
    [navigate, phase, reduceMotion],
  );

  const handleAnimationComplete = useCallback(() => {
    if (phase === "covering" && destinationRef.current) {
      navigate(destinationRef.current);
      destinationRef.current = null;
      setPhase("revealing");
      return;
    }

    if (phase === "revealing") {
      setPhase("idle");
    }
  }, [navigate, phase]);

  const contextValue = useMemo(
    () => ({
      isTransitioning: phase !== "idle",
      navigateWithTransition,
    }),
    [navigateWithTransition, phase],
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            aria-hidden="true"
            className={styles.transitionLayer}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "covering" ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }

  return context;
}
