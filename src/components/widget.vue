<script setup lang="ts">
import Account from 'arweave-account';
import type { ArAccount } from 'arweave-account';
import { run } from 'ar-gql';
import { useAccountStore } from '@/stores/account';
import Twitter from '@/components/icons/Twitter.vue';
import GitHub from './icons/GitHub.vue';
import Instagram from './icons/Instagram.vue';

const account = new Account();
const store = useAccountStore();
const query = `{
  transactions(
    first: 1
    tags: [{name:"Protocol-Name",values:"Account-0.2"}]
  ) {
    edges {
      node {
        id
        owner {
          key
          address
        }
        tags {
          name
          value
        }
        block {
          timestamp
        }
      }
    }
  }
}`;

run(query).then((result) => {
  var address = result.data.transactions.edges[0].node.owner.address;
  account.get('64k1zby9gaqwkxTuznTmY2mKpdP0RJzasLml8BLjwmM').then((user: ArAccount) => {

    const { setTxid, setAddr, setHandle, setProfile } = store;

    setTxid(user.txid);
    setAddr(user.addr);
    setHandle(user.handle);
    setProfile(user.profile);
  }).catch((e) => {
    console.log(JSON.stringify(e));
  });
})
  .catch((e) => {
    console.log(JSON.stringify(e));
  })

</script>

<template>
  <div class="card w-96 card_background shadow-xl">
    <div class="card-body">
      <div class="justify-center text-center">
        <div class="avatar">
          <div class="w-24 shadow-lg mask mask-hexagon">
            <a :href="'https://r.metaweave.xyz/u/' + store.addr">
              <img :src="store.profile.avatarUrl" />
            </a>
          </div>
        </div>
        <div v-if="store.handle" class="pt-1">
          <a :href="'https://r.metaweave.xyz/u/' + store.addr" class="text-slate-200 text-sm">{{store.handle}}</a>
        </div>
        <div v-if="store.profile.name" class="pt-2">
          <p class="text-white text-lg">{{store.profile.name}}</p>
        </div>
        <div v-if="store.profile.bio" class="pt-1">
          <p class="text-slate-200">{{store.profile.bio}}</p>
        </div>
        <div class="pt-4 mx-auto flex justify-center">
          <a class="px-4" v-if="store.profile.links.twitter" target="_blank"
            :href="'https://twitter.com/'+store.profile.links.twitter">
            <Twitter class="text-white" />
          </a>
          <a class="px-4" v-if="store.profile.links.github" target="_blank"
            :href="'https://github.com/'+store.profile.links.github">
            <GitHub class="text-white" />
          </a>
          <a class="px-4" v-if="store.profile.links.instagram" target="_blank"
            :href="'https://instagram.com/'+store.profile.links.instagram">
            <Instagram class="text-white" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card_background {
  background: rgb(188, 0, 255);
  background: -moz-linear-gradient(38deg, rgba(188, 0, 255, 1) 19%, rgba(248, 23, 181, 1) 100%);
  background: -webkit-linear-gradient(38deg, rgba(188, 0, 255, 1) 19%, rgba(248, 23, 181, 1) 100%);
  background: linear-gradient(38deg, rgba(188, 0, 255, 1) 19%, rgba(248, 23, 181, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#bc00ff", endColorstr="#f817b5", GradientType=1);
}

a {
  text-shadow: 0px 0px 20px #000000;
}
</style>
