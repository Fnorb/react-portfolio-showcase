import { Component } from "react";
import type { ReactNode } from "react";
import Section from "./Section";

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Section>
          <h2 className="text-lg font-semibold mb-2">
            Etwas ist schiefgelaufen
          </h2>
          <p className="text-sm opacity-80">{this.state.error.message}</p>
        </Section>
      );
    }
    return this.props.children;
  }
}
