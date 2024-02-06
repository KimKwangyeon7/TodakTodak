<template>
  <div class="modal-content" style="border-radius: 10px;">
        <form @submit.prevent="submitGoal">
            <!-- Goal Content Input -->
            <div class="form-group">
                <label for="goalContent">목표 내용:</label>
                <input v-model="goalContent" type="text" id="goalContent" class="form-control" required>
            </div>

            <!-- Color Input -->
            <div class="form-group">
                <label for="color">목표 색상:</label>
                <input v-model="color" type="text" id="color" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">저장</button>
        </form>
    </div>
</template>
  
<script>
    import { useGoalsStore } from '@/stores/goals' // Adjust the path if necessary

    export default {
        data() {
            return {
                goalContent: '',
                color: '',
            };
        },
        methods: {
            submitGoal() {
                const goalsStore = useGoalsStore();
                goalsStore.addGoal({ goalContent: this.goalContent, color: this.color });
                
                // Redirect after adding goal
                this.$router.push('/Main');
            },
        },
    };
</script>

<style scoped>
    .modal-content {
        background: #fff;
    }
    .btn-close {
        width: 20px;
        height: 20px;
        background-color: #EAF3F9;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        margin-right: auto;
    }
    .form-group {
        text-align: left;
        margin-left: 10px;
        margin-right: 10px;
    }
    .custom-control-label {
        padding-left: 10px;
    }
</style>
