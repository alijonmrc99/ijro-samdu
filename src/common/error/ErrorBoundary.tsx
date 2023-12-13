import { ErrorView } from ".";
import React from "react";

type ErrorBoundaryProps = {
    children: React.ReactNode;
}

type ErrorBoundaryState = {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("Error Boundary caught an error:", error, errorInfo)
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <ErrorView />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;