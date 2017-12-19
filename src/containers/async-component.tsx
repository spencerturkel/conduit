import {Component, ComponentType, ReactNode} from 'react';
import setDisplayName from '../components/set-display-name';

export interface AsyncComponentProps {
    importPath: string;
    renderComponent: (componentType: ComponentType) => ReactNode;
    renderError: (error: any) => ReactNode;
    renderLoading: () => ReactNode;
}

enum AsyncComponentState {
    Error,
    Loading,
    Rendering,
}

type AsyncComponentStateValue =
    | {state: AsyncComponentState.Error; error: any}
    | {state: AsyncComponentState.Loading}
    | {state: AsyncComponentState.Rendering; component: ComponentType};

const AsyncComponent = (
    importFn: (path: string) => Promise<{default: ComponentType}>,
): ComponentType<AsyncComponentProps> => {
    const result = class AsyncComponentImplementation extends Component<AsyncComponentProps, AsyncComponentStateValue> {
        constructor(readonly props: AsyncComponentProps) {
            super(props);
            this.state = {state: AsyncComponentState.Loading};
        }

        componentDidMount(): void {
            importFn(this.props.importPath)
                .then(({default: component}: {default: ComponentType}) =>
                    this.setState({
                        state: AsyncComponentState.Rendering,
                        component,
                    } as AsyncComponentStateValue),
                )
                .catch(error => {
                    this.setState({state: AsyncComponentState.Error, error} as AsyncComponentStateValue);
                });
        }

        render(): ReactNode {
            switch (this.state.state) {
                case AsyncComponentState.Error:
                    return this.props.renderError(this.state.error);
                case AsyncComponentState.Loading:
                    return this.props.renderLoading();
                case AsyncComponentState.Rendering:
                    return this.props.renderComponent(this.state.component);
                default:
                    throw new Error();
            }
        }
    };

    setDisplayName(result, AsyncComponent, importFn);

    return result;
};

export default AsyncComponent;
