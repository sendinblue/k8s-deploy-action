perform_assert () {
  local call_file="$MOCKBIN_PATH/$1.mockbinout"
  local call_index="$2"
  local expected_args="$3"

  echo "Performing assertion on: $call_file (starting at $call_index)"
  echo "Expected args: $expected_args"
  $MOCKBIN_ORIGINAL_NODEJS "$GITHUB_ACTION_PATH/assets/assert.js" \
    --call-file "$call_file" \
    --call-index "$call_index" \
    --expected-args "$expected_args" \
    --expected-stdin "$ASSERT_STDIN"
  echo "Finished assert $?"
}
