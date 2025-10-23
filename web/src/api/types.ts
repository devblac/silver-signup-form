
export type SignupPayload = { 
    email: string; password: string 
};

export type SignupResult = {
     success: true } | { success: false; error: string 
    };

export interface SignupClient { 
    signup(data: SignupPayload): Promise<SignupResult> 
}
