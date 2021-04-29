type CaptureKrnResult = { krn: string }
type CaptureIdResult = { id: string }
type CaptureNameResult = { name: string }

type QueryBuilderBase<TResult> = {
    build: () => { query: string, extract: (raw: any) => TResult }
}

type GetextractReturnType<U extends QueryBuilderBase<unknown>> = ReturnType<ReturnType<U['build']>['extract']>
type WithFragmentResult<U extends QueryBuilderBase<unknown>, FragmentResult> = GetextractReturnType<U> & FragmentResult

// correct
type QueryTransactionsBuilder<TResult> = QueryBuilderBase<TResult> & {
    withCaptureKrn:  <U extends QueryTransactionsBuilder<unknown>>(this: U) => QueryTransactionsBuilder<WithFragmentResult<U, CaptureKrnResult>> 
    withCaptureId:   <U extends QueryTransactionsBuilder<unknown>>(this: U) => QueryTransactionsBuilder<WithFragmentResult<U, CaptureIdResult>> 
    withCaptureName: <U extends QueryTransactionsBuilder<unknown>>(this: U) => QueryTransactionsBuilder<WithFragmentResult<U, CaptureNameResult>> 
}

// correct
const query: QueryTransactionsBuilder<unknown> = {
    withCaptureKrn: function<U extends QueryTransactionsBuilder<unknown>>(this: U): QueryTransactionsBuilder<WithFragmentResult<U, CaptureKrnResult>> {
        return {
            ...this,
            build: this.build as () => { query: string, extract: (raw: any) => GetextractReturnType<U> & CaptureKrnResult}
        }
    },
    withCaptureId: function<U extends QueryTransactionsBuilder<unknown>>(this: U):  QueryTransactionsBuilder<WithFragmentResult<U,  CaptureIdResult>> {
        return {
            ...this,
            build: this.build as () => { query: string, extract: (raw: any) => GetextractReturnType<U> & CaptureIdResult }
        }
    },
    withCaptureName: function<U extends QueryTransactionsBuilder<unknown>>(this: U):  QueryTransactionsBuilder<WithFragmentResult<U,  CaptureNameResult>> {
        return {
            ...this,
           build: this.build as () => { query: string, extract: (raw: any) => GetextractReturnType<U> & CaptureNameResult }
        }
    },
    build: (): { query: string, extract: (raw: any) => unknown } => {
        return {} as { query: string, extract: (raw: any) => unknown }
    }
}

const r0 = query.build()
const r1 = query.withCaptureKrn().build()
const r2 = query.withCaptureKrn().withCaptureId().build()
const r3 = query.withCaptureKrn().withCaptureName().build()
const r4 = query.withCaptureKrn().withCaptureId().withCaptureName().build()
const r5 = query.withCaptureId().withCaptureKrn().build()

const osis = {
    query: (q: string) => {
        return { data: 'something' }
    }
}

const res = osis.query(r3.query)
const final = r3.extract({})
final.krn
final.id
final.name
