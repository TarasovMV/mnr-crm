export const DEFAULT_SCHEMA_PARAMS = {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
};
