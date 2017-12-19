import {Component, ComponentType, ReactNode} from 'react';
import setDisplayName from '../components/set-display-name';

export interface AsyncComponentProps<TProps = {}> {
    renderComponent: (componentType: ComponentType<TProps>) => ReactNode;
    renderError: (error: any) => ReactNode;
    renderLoading: () => ReactNode;
}

enum AsyncComponentState {
    Error,
    Loading,
    Rendering,
}

type AsyncComponentStateValue<TProps = {}> =
    | {state: AsyncComponentState.Error; error: any}
    | {state: AsyncComponentState.Loading}
    | {state: AsyncComponentState.Rendering; component: ComponentType<TProps>};

const AsyncComponent = <TProps, _>(
    importFn: () => Promise<{default: ComponentType<TProps>}>,
): ComponentType<AsyncComponentProps<TProps>> => {
    const result = class AsyncComponentImplementation extends Component<
        AsyncComponentProps<TProps>,
        AsyncComponentStateValue<TProps>
    > {
        constructor(readonly props: AsyncComponentProps<TProps>) {
            super(props);
            this.state = {state: AsyncComponentState.Loading};
        }

        componentDidMount(): void {
            importFn()
                .then(({default: component}) =>
                    this.setState({
                        state: AsyncComponentState.Rendering,
                        component,
                    } as AsyncComponentStateValue<TProps>),
                )
                .catch(error => {
                    this.setState({state: AsyncComponentState.Error, error} as AsyncComponentStateValue<TProps>);
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
