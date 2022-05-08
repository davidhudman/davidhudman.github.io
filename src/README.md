# Personal Resume Site

## Author

- David Hudman

## Goals

- Make a tool where people can easily pay me crypto without requiring me to send them a new address each time
- Provide a decent payment interface so many businesses could copy it
- Accept payments in Bitcoin Cash (BCH) since fees are less than a cent and confirm instantly
- This would be a good place for a personal resume site, so do that too.

## Tools / Frameworks used

- [formik](https://formik.org/docs/overview)
- [bootstrap](https://getbootstrap.com/docs/3.4/)
- [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction)
- [react-dom](https://reactjs.org/docs/react-dom.html)
- [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)
- [yup](https://github.com/jquense/yup)
- [Serverless Framework v1.0+](https://serverless.com/)
- [Setup your AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

## Getting Started

Download the repo

`git clone https://github.com/davidhudman/personal-resume-site.git personal-resume-site`

Install the packages with yarn

`yarn install`

Start the project with yarn to run on http://localhost:3000

`yarn start`

Deploy changes to AWS

`yarn run deploy:prod`
