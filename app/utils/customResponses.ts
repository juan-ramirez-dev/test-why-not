
export interface ICreateResponse {
  data ?: any
  message : string
}

export interface ICreateResponseReturn {
  code : 500 | 200
  message : string
  response : any
  status : 'failed' | 'success'
}

export const createResponseFailed = (data: ICreateResponse) : ICreateResponseReturn => {
  return {
    code : 500,
    message : data?.message,
    response : data?.data || null,
    status : 'failed'
  }
}


export const createResponseSuccess = (data: ICreateResponse) : ICreateResponseReturn => {
  return {
    code : 200,
    message : data?.message,
    response : data?.data,
    status : 'success'
  }
}