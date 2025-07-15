// src/components/ErrorBoundary.tsx
//If any child component (including App) throws in render, lifecycle or constructors, the boundary catches it and shows a friendly message instead of blank screen.
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("Uncaught error:", error, info);
    // You could also log to an external service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong.
          </h1>
          <p>Please try refreshing the page, or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
