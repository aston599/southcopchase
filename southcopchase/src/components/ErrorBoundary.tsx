import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Login hatası:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <h2>Bir hata oluştu</h2>
          <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
