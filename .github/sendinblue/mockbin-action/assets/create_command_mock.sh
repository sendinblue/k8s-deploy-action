MOCKBIN_EXECUTABLE_PATH="$GITHUB_ACTION_PATH/assets/mockbin.js"

create_command_mock () {
  local command="$MOCKBIN_PATH/$1"
  if [[ ! -f "$command" ]]; then
    echo "Creating command: $command"
    echo "#!${MOCKBIN_ORIGINAL_NODEJS}" > "$command"
    cat "$MOCKBIN_EXECUTABLE_PATH" >> "$command"
    chmod +x "$command"
  fi
}
