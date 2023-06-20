"use strict";(self.webpackChunkcloudmanager_api_docs=self.webpackChunkcloudmanager_api_docs||[]).push([[5668],{6770:function(e,a,t){t.r(a),t.d(a,{_frontmatter:function(){return c},default:function(){return g}});var n=t(87462),i=t(45987),d=(t(28387),t(10498)),o=t(91515),s=t(2326);const r=["components"],c={},p=(l="InlineAlert",function(e){return console.warn("Component "+l+" was not imported, exported, or provided by MDXProvider as global scope"),(0,d.mdx)("div",e)});var l;const m={_frontmatter:c},b=o.Z;function g(e){let{components:a}=e,t=(0,i.Z)(e,r);return(0,d.mdx)(b,(0,n.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,d.mdx)("h1",{id:"authentication"},"Authentication"),(0,d.mdx)("h2",{id:"authentication-headers"},"Authentication Headers"),(0,d.mdx)("p",null,"Every inbound HTTP API call to the Cloud Manager API must contain these three headers:"),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("inlineCode",{parentName:"li"},"x-api-key")),(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("inlineCode",{parentName:"li"},"x-gw-ims-org-id")),(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("inlineCode",{parentName:"li"},"Authorization"))),(0,d.mdx)("p",null,"The values which should be sent in the ",(0,d.mdx)("inlineCode",{parentName:"p"},"x-api-key")," and ",(0,d.mdx)("inlineCode",{parentName:"p"},"x-gw-ims-org-id")," headers are provided in the Credentials details screen in the ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/console"},"Adobe Developer Console"),". The value of the ",(0,d.mdx)("inlineCode",{parentName:"p"},"x-api-key")," header is the ",(0,d.mdx)("em",{parentName:"p"},"Client ID")," and the value for the ",(0,d.mdx)("inlineCode",{parentName:"p"},"x-gw-ims-org-id")," header is the ",(0,d.mdx)("em",{parentName:"p"},"Organization ID"),"."),(0,d.mdx)("p",null,(0,d.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,d.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"68.75%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,d.mdx)("picture",{parentName:"span"},"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/5530d/credential-details.webp 320w","/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/0c8fb/credential-details.webp 640w","/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/94b1e/credential-details.webp 1280w","/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/0528b/credential-details.webp 1310w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/dd4a7/credential-details.png 320w","/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/0f09e/credential-details.png 640w","/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/bbbf7/credential-details.png 1280w","/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/b4bc2/credential-details.png 1310w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,d.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/cloudmanager-api-docs/static/38cfddb9f6b5b3b1dd96ffc31948a01e/bbbf7/credential-details.png",alt:"Credential details",title:"Credential details",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,d.mdx)("p",null,"The ",(0,d.mdx)("inlineCode",{parentName:"p"},"Authorization")," header's value is in the form ",(0,d.mdx)("inlineCode",{parentName:"p"},"Bearer ")," followed by a generated access token, e.g. ",(0,d.mdx)("inlineCode",{parentName:"p"},"Bearer somelongtokenvalue"),"."),(0,d.mdx)("h2",{id:"generating-an-access-token"},"Generating an Access Token"),(0,d.mdx)("h3",{id:"manual-generation-using-adobe-developer-console"},"Manual Generation Using Adobe Developer Console"),(0,d.mdx)(p,{variant:"warning",slots:"text",mdxType:"InlineAlert"}),(0,d.mdx)("p",null,"Please note that tokens generated through the AEM Developer Console cannot be used with the Cloud Manager API. If you want to manually generate a token, you must use the Adobe Developer Console."),(0,d.mdx)("p",null,"Generating an access token can be done by navigating to the Cloud Manager API page for the project in the Adobe Developer Console and pasting the private key for the project."),(0,d.mdx)("p",null,(0,d.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,d.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"60.3125%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,d.mdx)("picture",{parentName:"span"},"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/5530d/generate-access-token.webp 320w","/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/0c8fb/generate-access-token.webp 640w","/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/94b1e/generate-access-token.webp 1280w","/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/a1b9b/generate-access-token.webp 1316w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/dd4a7/generate-access-token.png 320w","/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/0f09e/generate-access-token.png 640w","/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/bbbf7/generate-access-token.png 1280w","/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/aaa27/generate-access-token.png 1316w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,d.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/cloudmanager-api-docs/static/50de851c66a2adb6eae07ad1b1ba3e03/bbbf7/generate-access-token.png",alt:"Generate Access Token",title:"Generate Access Token",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,d.mdx)("p",null,"Upon clicking the ",(0,d.mdx)("em",{parentName:"p"},"Generate Token")," button, an access token will be generated and can be copied to the clipboard."),(0,d.mdx)("p",null,(0,d.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1280px"}},"\n      ",(0,d.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"60%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,d.mdx)("picture",{parentName:"span"},"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/5530d/generated-access-token.webp 320w","/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/0c8fb/generated-access-token.webp 640w","/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/94b1e/generated-access-token.webp 1280w","/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/a1b9b/generated-access-token.webp 1316w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/webp"}),"\n          ",(0,d.mdx)("source",{parentName:"picture",srcSet:["/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/dd4a7/generated-access-token.png 320w","/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/0f09e/generated-access-token.png 640w","/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/bbbf7/generated-access-token.png 1280w","/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/aaa27/generated-access-token.png 1316w"],sizes:"(max-width: 1280px) 100vw, 1280px",type:"image/png"}),"\n          ",(0,d.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/cloudmanager-api-docs/static/d720ac3100bd93e587d9229fe9feae24/bbbf7/generated-access-token.png",alt:"Generated Access Token",title:"Generated Access Token",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,d.mdx)("p",null,"Access tokens generated in this fashion will be valid for 24 hours, after which a new token must be generated."),(0,d.mdx)("h3",{id:"programatic-generation"},"Programatic Generation"),(0,d.mdx)("p",null,"Programmatic generation of an access token is done by generating a JSON Web Token (JWT) and exchanging it with the Adobe Identity Management Service (IMS) for an access token."),(0,d.mdx)(p,{variant:"help",slots:"text",mdxType:"InlineAlert"}),(0,d.mdx)("p",null,"The below is a summary of this process. Complete documentation can be found in the ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/developer-console/docs/guides/authentication/JWT/"},"Adobe I/O JWT Documentation")),(0,d.mdx)("p",null,"The JWT is constructed as a JSON object with these keys, referred to as ",(0,d.mdx)("em",{parentName:"p"},"claims"),":"),(0,d.mdx)("ul",null,(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("inlineCode",{parentName:"li"},"exp"),"- the requested expiration of the access token, expressed as a number of seconds since January 1st 1970 GMT. For most use cases, this should be a relatively small value, e.g. 5 minutes. For example, for five minutes from now, this value should be ",(0,d.mdx)(s.Z,{addition:300,mdxType:"Epoch"}),"."),(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("inlineCode",{parentName:"li"},"iss"),"\t- the Organization ID from the Adobe Developer Console project, in the format org_ident@AdobeOrg."),(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("inlineCode",{parentName:"li"},"sub")," - the Technical Account ID from the Adobe Developer Console integration, in the format: ",(0,d.mdx)("a",{parentName:"li",href:"mailto:id@techacct.adobe.com"},"id@techacct.adobe.com"),"."),(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("inlineCode",{parentName:"li"},"aud")," - the Client ID from the Adobe Developer Console integration ",(0,d.mdx)("em",{parentName:"li"},"prepended")," with ",(0,d.mdx)("inlineCode",{parentName:"li"},"https://ims-na1.adobelogin.com/c/"),"."),(0,d.mdx)("li",{parentName:"ul"},(0,d.mdx)("inlineCode",{parentName:"li"},"https://ims-na1.adobelogin.com/s/ent_cloudmgr_sdk")," - set to the literal value ",(0,d.mdx)("inlineCode",{parentName:"li"},"true"),".")),(0,d.mdx)("p",null,"This JSON object must be then base64 encoded and signed using the private key for the project."),(0,d.mdx)("p",null,"Finally, the encoded value is sent in the body of a ",(0,d.mdx)("inlineCode",{parentName:"p"},"POST")," request to ",(0,d.mdx)("a",{parentName:"p",href:"https://ims-na1.adobelogin.com/ims/exchange/jwt"},"https://ims-na1.adobelogin.com/ims/exchange/jwt")," along with the Client ID and Client Secret for the project."),(0,d.mdx)("h4",{id:"language-support-for-jwt"},"Language Support for JWT"),(0,d.mdx)("p",null,"While it is possible to do the entire JWT generation and exchange process in custom code, it is more common to use a higher-level library to do so. A number of such libraries are listed on the ",(0,d.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/developer-console/docs/guides/authentication/JWT/"},"Adobe I/O JWT Documentation"),"."))}g.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-getting-started-authentication-md-00da1b13fd2d6c18c197.js.map