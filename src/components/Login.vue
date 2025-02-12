<template>
    <div class="container">
      <h2>Login</h2>
      <form>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="text" class="form-control" name="email" placeholder="john.smith@email.fake">
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" name="password" />
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
</template>
