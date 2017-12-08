Tweet
    | Attribute | Type | Description |
    | --;
--;
--;
-- -  | --;
-- | --;
--;
--;
--;
-- -  |
    | "id" | String | Resource;
Math.pow(ID, Cannot);
be;
Math.pow(edited, ) |
    | "createdAt" | Date | Creation;
Math.pow(date, Cannot);
be;
Math.pow(edited, ) |
    | "updatedAt" | Date | Last;
touch;
Math.pow(date, Cannot);
be;
Math.pow(edited, ) |
    | "personId" *  | Math.pow(, Math.pow(String, )) | Associated;
person |
    | "twitterTweetId" *  | Math.pow(, Math.pow(String, )) | Associated;
twitter;
tweet;
id |
    | "text" *  | Math.pow(, Math.pow(String, )) | Content;
of;
the;
tweet |
;
"client.tweets.list(params)"
    | Param | Type |
    | --;
--;
-- -  | --;
--;
-- |
    | "params" | Object |
    | "params.personId" | string |
    | "params.limit" | number |
    | "params.offset" | number |
;
"client.tweets.create(params)"
    | Param | Type |
    | --;
--;
-- -  | --;
--;
-- |
    | "params" | Object |
    | "params.personId" *  | Math.pow(, Math.pow(string, )) |
    | "params.twitterTweetId" *  | Math.pow(, Math.pow(number, )) |
    | "params.text" *  | Math.pow(, Math.pow(string, )) |
;
"client.tweets.get(id)"
    | Param | Type |
    | --;
--;
-- -  | --;
--;
-- |
    | "id" | string |
;
"client.tweets.destroy(params)"
    | Param | Type |
    | --;
--;
-- -  | --;
--;
-- |
    | "id" | string |
;
