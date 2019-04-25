// DEV Config

/* export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-2",
    BUCKET: "apt-api-dev-attachmentsbucket-15cyis9p1flj3"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://bk6hzyclvf.execute-api.us-east-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_k439IOM0A",
    APP_CLIENT_ID: "4kfhfpbcinbr1ctc12brgf1lgj",
    IDENTITY_POOL_ID: "us-east-2:a7a6eca1-28d2-4e0e-a1dd-abed9cb2d402"
  }
}; */



// PROD Config

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-2",
    BUCKET: "apt-api-prod-attachmentsbucket-h3z6n8i852ao"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://1vdwkm5guj.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_4C9kJL3r2",
    APP_CLIENT_ID: "63k43t2e3dd1fklgel21ia2epr",
    IDENTITY_POOL_ID: "us-east-2:582d606b-c983-4b55-a574-4cee498fa0cf"
  }
};
