"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramLogin = void 0;
const react_1 = __importStar(require("react"));
function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    const code = vars
        .map((i) => {
        const pair = i.split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
        return null;
    })
        .filter((d) => {
        if (d) {
            return true;
        }
        return false;
    });
    return code[0];
}
class InstagramLogin extends react_1.Component {
    constructor(props) {
        super(props);
        this.onBtnClick = this.onBtnClick.bind(this);
    }
    componentDidMount() {
        if (this.props.implicitAuth) {
            const matches = window.location.hash.match(/=(.*)/);
            if (matches) {
                this.fetchUserDetails(matches[1]);
            }
        }
        else if (window.location.search.includes("code")) {
            this.exchangeCodeForToken(getQueryVariable("code"));
        }
        else if (window.location.search.includes("error")) {
            this.props.onFailure({
                error: getQueryVariable("error"),
                error_reason: getQueryVariable("error_reason"),
                error_description: getQueryVariable("error_description"),
            });
        }
    }
    onBtnClick() {
        const { clientId, scope } = this.props;
        const redirectUri = this.props.redirectUri || window.location.href;
        const responseType = this.props.implicitAuth ? "token" : "code";
        window.location.href = `https://api.instagram.com/oauth/authorize/?app_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
    }
    exchangeCodeForToken(code) {
        const redirectUri = this.props.redirectUri || window.location.href;
        const { clientId, clientSecret } = this.props;
        const tokenUrl = `https://api.instagram.com/oauth/access_token`;
        fetch(tokenUrl, {
            method: "POST",
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "authorization_code",
                redirect_uri: redirectUri,
                code: code,
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.access_token) {
                this.fetchUserDetails(data.access_token);
            }
            else {
                this.props.onFailure(data);
            }
        })
            .catch((error) => {
            this.props.onFailure(error);
        });
    }
    fetchUserDetails(accessToken) {
        fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`)
            .then((response) => response.json())
            .then((data) => {
            this.props.onSuccess(data);
        })
            .catch((error) => {
            this.props.onFailure(error);
        });
    }
    render() {
        const style = {
            display: "inline-block",
            background: "linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)",
            color: "#fff",
            width: 200,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 2,
            border: "1px solid transparent",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: '"proxima-nova", "Helvetica Neue", Arial, Helvetica, sans-serif',
        };
        const { cssClass, buttonText, children, tag, type } = this.props;
        const instagramLoginButton = react_1.default.createElement(tag, {
            className: cssClass,
            onClick: this.onBtnClick,
            style: cssClass ? {} : style,
            type,
        }, children || buttonText);
        return instagramLoginButton;
    }
}
exports.InstagramLogin = InstagramLogin;
InstagramLogin.defaultProps = {
    buttonText: "Login with Instagram",
    scope: "basic",
    tag: "button",
    type: "button",
    implicitAuth: false,
};
exports.default = InstagramLogin;
//# sourceMappingURL=index.js.map