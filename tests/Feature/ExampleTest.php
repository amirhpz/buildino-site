<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_the_landing_page_is_available(): void
    {
        $this->assertFileExists(public_path('images/logo/brand-color.png'));
        $this->assertFileExists(public_path('images/logo/brand-white.png'));

        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertSee('بیلدینو')
            ->assertSee('id="root"', false)
            ->assertHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=(), payment=(), usb=()')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'DENY');
    }
}
