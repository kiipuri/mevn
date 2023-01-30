<script>
export default {
  mounted () {
    this.$storage.clearStorageSync()
    this.$router.push("/")
  },
  render () {
    return true
  }
}
</script>
