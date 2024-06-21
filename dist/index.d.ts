import React, { Component, ReactNode } from "react";
interface InstagramLoginProps {
    onSuccess: (response: any) => void;
    onFailure: (error: {
        error: string;
        error_reason: string;
        error_description: string;
    }) => void;
    clientId: string;
    clientSecret: string;
    buttonText?: string;
    scope?: string;
    cssClass?: string;
    children?: ReactNode;
    tag?: string;
    redirectUri?: string;
    type?: string;
    implicitAuth?: boolean;
}
interface InstagramLoginState {
}
declare class InstagramLogin extends Component<InstagramLoginProps, InstagramLoginState> {
    static defaultProps: {
        buttonText: string;
        scope: string;
        tag: string;
        type: string;
        implicitAuth: boolean;
    };
    constructor(props: InstagramLoginProps);
    componentDidMount(): void;
    onBtnClick(): void;
    exchangeCodeForToken(code: string): void;
    fetchUserDetails(accessToken: string): void;
    render(): React.DOMElement<{
        className: string | undefined;
        onClick: () => void;
        style: {};
        type: string | undefined;
    }, Element>;
}
export { InstagramLogin };
export default InstagramLogin;
//# sourceMappingURL=index.d.ts.map