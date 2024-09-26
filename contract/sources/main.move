module sortcat::play {
    use std::error;
    use std::signer;

    //:!:>resource
    struct ScoreHolder has key {

        u64: u64,

        vec_u256: vector<u256>,
    }
    //<:!:resource

    /// There is no holder present
    const ENOT_INITIALIZED: u64 = 0;

    #[view]
    public fun get_score(addr: address): ( u64, vector<u256>) acquires ScoreHolder {
        assert!(exists<ScoreHolder>(addr), error::not_found(ENOT_INITIALIZED));
        let holder = borrow_global<ScoreHolder>(addr);

        ( holder.u64, holder.vec_u256)
    }

    public entry fun set_score(
        account: signer,
        u64: u64,
        vec_u256: vector<u256>)
    acquires ScoreHolder {
        let account_addr = signer::address_of(&account);
        if (!exists<ScoreHolder>(account_addr)) {
            move_to(&account, ScoreHolder {
                u64,
                vec_u256,
            })
        } else {
            let old_holder = borrow_global_mut<ScoreHolder>(account_addr);
            old_holder.u64 = u64;
            old_holder.vec_u256 = vec_u256;
        }
    }
}
