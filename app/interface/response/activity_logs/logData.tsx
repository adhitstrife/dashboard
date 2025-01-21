interface fieldData {
    field_name: string;
    new_data: string | null;
    old_data: string | null;
}

interface logData {
    user: string; // Name of the user performing the action
    action_time: string; // ISO 8601 timestamp of the action
    action_type: string; // Type of action performed, e.g., "Update"
    meta_data: {
        username: string;
        user_type: string;
        browser_info: string;
        fields: fieldData[]
    };
    log_message: string; // Log message describing the action
}