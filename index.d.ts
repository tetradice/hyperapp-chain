declare const chainHandler: hyperappSubset.Middleware;

export function chain<State>(...actions: hyperappSubset.Dispatchable<State>[]): hyperappSubset.Action<State>;

declare namespace hyperappSubset {
    type PayloadCreator<DPayload, CPayload> = ((data: DPayload) => CPayload);

    export type Dispatchable<State, DPayload = void, CPayload = any> = (
        ([Action<State, CPayload>, PayloadCreator<DPayload, CPayload>])
        | ([Action<State, CPayload>, CPayload])
        | Action<State, void>      // (state) => ({ ... }) | (state) => ([{ ... }, effect1, ...])
        | Action<State, DPayload>  // (state, data) => ({ ... })  | (state, data) => ([{ ... }, effect1, ...])
    );

    export type Dispatch<State, NextPayload = void> = (obj: Dispatchable<State, NextPayload>, data: NextPayload) => State;

    export interface EffectRunner<State, NextPayload, Props> {
        (dispatch: Dispatch<State, NextPayload>, props: Props): void;
    }

    export type Effect<State = any> = [EffectRunner<State, any, any>, any];

    export type ActionResult<State> = (State | [State, ...Effect<State>[]] | Dispatchable<State>);

    export interface Action<State, Payload = void> {
        (state: State, data: Payload): ActionResult<State>;
    }

    export type MiddlewareFunc<State = any> = (action: State | Dispatchable<State>, props: unknown) => void;

    export type Middleware<State = any> = (func: MiddlewareFunc<State>) => MiddlewareFunc<State>;
}