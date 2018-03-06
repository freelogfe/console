import {manageMembers} from '@/services/groups'
import {USER_GROUP_TYPE, NODE_GROUP_TYPE} from "../../../config/group";
import GroupMemberSelector from '../member-selector/index.vue'


function diff(a, b) {
  return a.filter(function (v) {
    return b.indexOf(v) < 0;
  });
}

export default {
  name: 'group-detail',
  data() {
    return {
      detail: {},
      groupMembers: [],
      asyncMembers: [],
      loading: false
    }
  },
  components: {GroupMemberSelector},
  mounted() {
    var groupId = this.$route.params.groupId
    if (groupId) {
      this.load(groupId)
        .then((detail) => {
          var originalMemberIds = []
          this.groupMembers = detail.members.map((member) => {
            originalMemberIds.push(member.memberId)
            return member.memberName || member.memberId
          })

          this.originalMemberIds = originalMemberIds
          this.detail = detail
        })
    } else {
      this.$message.error('缺少参数groupId');
    }
  },
  methods: {
    load(param) {
      return this.$services.groups.get(param || {})
        .then((res) => {
          return res.getData();
        }).catch(this.$error.showErrorMessage)
    },
    getRemoveMembers() {
      var removed = []
      this.detail.members.forEach((member) => {
        if (this.groupMembers.indexOf(member.memberName || member.memberId) === -1) {
          removed.push(member.memberId)
        }
      })

      return removed
    },
    getAddMembers() {
      var addList = []
      var names = this.detail.members.map((m) => m.memberName)
      var ids = this.detail.members.map((m) => m.memberId)
      this.groupMembers.forEach((member) => {
        if (names.indexOf(member) === -1 && ids.indexOf(member) === -1) {
          addList.push(member)
        }
      })

      return addList
    },
    updateDetail() {
      const self = this;
      var addMembers = this.getAddMembers()
      var removeMembers = this.getRemoveMembers()


      manageMembers(this.$route.params.groupId, {
        addMembers,
        removeMembers
      }).then((res) => {
        if (res.data.data) {
          self.$message.success('分组修改成功')
        } else {
          self.$message.error(res.data.msg)
        }
      }).catch((err) => {
        self.$message.error(err.response.errorMsg || err)
      })
    }
  }
}
