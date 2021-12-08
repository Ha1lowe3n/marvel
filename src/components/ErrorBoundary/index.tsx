import { Component, ReactNode } from "react";
import { ErrorGif } from "../ErrorGif";

interface ErrorBoundaryProps {
    children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
    state = {
        error: false,
    };

    componentDidCatch(error: any, errorInfo: any) {
        console.log(error, errorInfo);
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <ErrorGif />;
        }

        return this.props.children;
    }
}
