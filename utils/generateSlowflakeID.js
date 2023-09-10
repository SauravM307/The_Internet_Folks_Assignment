const Snowflake = require("@theinternetfolks/snowflake").Snowflake;

const generateSnowFlakeID = () => {
  const ID = Snowflake.generate();
  return ID;
};
module.exports = generateSnowFlakeID;
