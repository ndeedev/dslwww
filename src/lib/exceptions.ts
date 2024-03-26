/* This is a new error exception I can use throughout the app */
export class AuthRequiredError extends Error {
    constructor(message='Auth is required to access this page.'){
        super(message)
        this.name = 'AuthRequiredError'
    }
}