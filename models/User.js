import mongoose from 'mongoose';
import mongooseSlugGenerator from 'mongoose-slug-generator';

mongoose.plugin(mongooseSlugGenerator);

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            maxLength: 50,
            required: true
        },
        lastName: {
            type: String,
            maxlength: 50,
            required: true
        },
        slug: {
            type: String,
            slug: ["firstName", "lastName"],
            index: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: [100, 'title is too long!']
        },
        intro: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: [400, 'intro is too long!']
        },
        profilePhoto: {
            type: String,
            required: true
        },
        education: [{
            institution: {
                type: String,
                required: true 
            },
            programme: {
                type: String,
                required: true 
            },
            startDate: {
                type: String,
                required: true
            },
            endDate: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            }
        }],
        workExperiences: [{
            position: {
                type: String,
                required: true 
            },
            organisation: {
                type: String,
                required: true 
            },
            startDate: {
                type: String,
                required: true
            },
            endDate: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            }
        }],
        portfolioProjects: [{
            title: {
                type: String,
                required: true 
            },
            description: {
                type: String
            },
            thumbnail: {
                type: String
            },
            demoLink: {
                type: String,
            }
        }],
        links: {
            LinkedIn: String,
            Github: String,
            Medium: String,
            Dribbble: String,
            Behance: String,
            YouTube: String
        },
        themeColor: {
            type: Number,
            required: true
        }
    }, 
    {
        virtuals: {
            fullName: {
                get() {
                    return `${this.name.firstName}-${this.name.lastName}`
                }
            }
        },
        collection: 'user'
    }
);

const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

userSchema.pre("save", function(next) {
    this.slug = `${slugify(this.firstName)}-${slugify(this.lastName)}`
    next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
